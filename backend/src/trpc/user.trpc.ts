import { z } from "zod";
import { router, privateProcedure } from "./trpc";
import prisma from "../config/prisma";
import { TRPCError } from "@trpc/server";

const userRouter = router({
  createNewUserIfRequired: privateProcedure
    .input(
      z.object({
        firstName: z.string(),
        lastName: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const uid = ctx.user.uid;
      const email = ctx.user.email;
      const firstName = input.firstName;
      const lastName = input.lastName;
      try {
        console.log("Creating user now");
        const existingUser = await prisma.user.findUnique({
          where: {
            id: uid,
          },
        });
        if (existingUser) {
          return {
            message: "User already exists",
            data: existingUser,
            isNew: false,
          };
        }
        const createdUser = await prisma.user.create({
          data: {
            id: uid,
            email,
            firstName,
            lastName,
          },
        });
        return {
          message: "User created",
          data: createdUser,
          isNew: true,
        };
      } catch (e) {
        throw new TRPCError({
          message: "Unable to create user",
          code: "INTERNAL_SERVER_ERROR",
          cause: e,
        });
      }
    }),
  updateUser: privateProcedure
    .input(
      z.object({
        firstName: z.string().optional(),
        lastName: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const uid = ctx.user.uid;
      const { firstName, lastName } = input;

      try {
        const updatedUser = await prisma.user.update({
          where: {
            id: uid,
          },
          data: {
            firstName,
            lastName,
          },
        });
        return {
          message: "User updated successfully",
          data: updatedUser,
        };
      } catch (e) {
        console.error(e);
        throw new TRPCError({
          message: "Unable to update user",
          code: "INTERNAL_SERVER_ERROR",
          cause: e,
        });
      }
    }),
  getCurrentUser: privateProcedure.query(async ({ ctx }) => {
    const uid = ctx.user.uid;
    try {
      const user = await prisma.user.findUniqueOrThrow({
        where: {
          id: uid,
        },
      });
      return user;
    } catch (e) {
      throw new TRPCError({
        message: "User not found",
        code: "BAD_REQUEST",
        cause: e,
      });
    }
  }),
  getWatchlist: privateProcedure.query(async ({ ctx }) => {
    const uid = ctx.user.uid;
    try {
      const watchlist = await prisma.watchlist.findMany({
        where: {
          userId: uid,
        },
        select: {
          stock: {
            select: {
              name: true,
              price: true,
            },
          },
        },
      });
      return watchlist.map(entry => ({
        name: entry.stock.name,
        price: entry.stock.price,
      }));
    } catch (e) {
      throw new TRPCError({
        message: "Failed to fetch watchlist",
        code: "INTERNAL_SERVER_ERROR",
        cause: e,
      });
    }
  }),
  getStocks: privateProcedure.query(async ({ ctx }) => {
    try {
      const stocks = await prisma.stocks.findMany({
        select: {
          name: true,
          ticker: true,
          price: true,
        },
      });
      return stocks;
    } catch (e) {
      throw new TRPCError({
        message: "Failed to fetch stocks",
        code: "INTERNAL_SERVER_ERROR",
        cause: e,
      });
    }
  }),
  addStockToWatchlist: privateProcedure
    .input(
      z.object({
        ticker: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const uid = ctx.user.uid;
      const ticker = input.ticker;
      try {
        const stock = await prisma.stocks.findUnique({
          where: {
            ticker: ticker,
          },
        });
        if (!stock) {
          throw new TRPCError({
            message: `Stock with ticker ${ticker} not found`,
            code: "NOT_FOUND",
          });
        }

        await prisma.watchlist.create({
          data: {
            userId: uid,
            stockTicker: ticker,
          },
        });

        return true;
      } catch (e) {
        throw new TRPCError({
          message: "Add to watchlist failed",
          code: "BAD_REQUEST",
          cause: e,
        });
      }
    }),
  removeStockFromWatchlist: privateProcedure
    .input(
      z.object({
        ticker: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const uid = ctx.user.uid;
      const ticker = input.ticker;
      try {
        const watchlistEntry = await prisma.watchlist.findUnique({
          where: {
            userId_stockTicker: {
              userId: uid,
              stockTicker: ticker,
            },
          },
        });
        if (!watchlistEntry) {
          throw new TRPCError({
            message: `Stock with ticker ${ticker} not in watchlist`,
            code: "NOT_FOUND",
          });
        }

        await prisma.watchlist.delete({
          where: {
            userId_stockTicker: {
              userId: uid,
              stockTicker: ticker,
            },
          },
        });

        return true;
      } catch (e) {
        throw new TRPCError({
          message: "Remove from watchlist failed",
          code: "BAD_REQUEST",
          cause: e,
        });
      }
    }),
});

export default userRouter;

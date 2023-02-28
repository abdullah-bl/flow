import type { LoaderArgs } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";
import { cache } from "~/cache.server";
import { prisma } from "~/db.server";



export const loader = async ({ request, }: LoaderArgs) => {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q") || "";

  try {
    // get from cache
    const cached = cache.get(query)
    console.log('cache hit', cached)
    if (cached) {
      console.log('cache hit')
      return json(JSON.parse(cached), {
        headers: {
          "Cache-Control": "max-age=0, s-maxage=86400",
        },
      });
    }

    // get from db
    const items = await prisma.item.findMany({
      where: {
        OR: [
          {
            name: {
              contains: query,
            },
          },
          {
            reference: {
              contains: query,
            },
          },
        ],
      },
      include: {
        budget: true,
      }
    })


    // set in cache
    console.log('cache miss')
    cache.set(query, JSON.stringify(items))

    return json(items, {
      headers: {
        "Cache-Control": "max-age=0, s-maxage=86400",
      },
    });
  } catch (error) {
    console.error(error)
    return json({ error: "Something went wrong" }, { status: 500 });
  }
}
import { Link, useLoaderData } from "@remix-run/react";
import { Image } from "@shopify/hydrogen";
import { CollectionConnection } from "@shopify/hydrogen/storefront-api-types";
import { LoaderArgs } from "@shopify/remix-oxygen"


export async function loader({ context }: LoaderArgs): Promise<{
    collections: CollectionConnection
}> {
    return await context.storefront.query(GET_ALL_COLLECTIONS);
}

export default function Collections() {
    const { collections } = useLoaderData<typeof loader>();

    console.log("dd", collections);

    return (
        <section className="w-full gap-4">
            <h2 className="w-full font-bold text-lead text-center text-4xl">
                Our Catalog
            </h2>
            <div className="grid-flow-row grid gap-2 gap-y-6 md:gap-4 lg:gap-6 grid-cols-2 sm:grid-cols-2">
            {collections.nodes.map((collection) => {
              return (
                <Link to={`/collections/${collection.handle}`} key={collection.id}>
                    <div className="grid gap-4 relative">
                        {collection?.image && (
                            <div className="max-h-10 object-cover overflow-hidden">
                                <Image
                                    alt={`Image of ${collection.title}`}
                                    data={collection.image}
                                    key={collection.id}
                                    sizes="(max-width: 32em) 100vw, 33vw"
                                    crop="center"
                                />
                            </div>
                        )}
                        <h2 className="font-medium text-copy absolute w-full h-full top-0 left-0 bg-gray-800 bg-opacity-60 flex items-center justify-center">
                            <span className="text-white font-large">{collection.title}</span>
                        </h2>
                    </div>
                </Link>
              );
            })}
          </div>
        </section>
      )
}

const GET_ALL_COLLECTIONS = `#graphql 
    query AllCollections {
        collections(first: 10) {
            nodes {
                id
                handle
                title
                image {
                    altText
                    width
                    height
                    url
                }
            }
        }
    }
`
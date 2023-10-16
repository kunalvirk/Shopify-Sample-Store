import { Link, useLoaderData } from "@remix-run/react";
import { Image } from "@shopify/hydrogen";
import { Collection } from "@shopify/hydrogen-react/storefront-api-types";
import { LoaderArgs } from "@shopify/remix-oxygen";

export function meta() {
    return [
        {
            title: 'Joe Artist'
        },
        {
            description: 'A custom store setup for LTIM'
        }
    ];
}

export async function loader({context}: LoaderArgs): Promise<any> {
    return await context.storefront.query(COLLECTIONS_QUERY);
}

export default function Index() {

    const { jewelry, bracelets } = useLoaderData<typeof loader>();
    const collections = [jewelry, bracelets];

  return (
    <section className="w-full gap-4">
        <h2 className="w-full font-bold text-lead text-center text-4xl">
            Collections
        </h2>
        <div className="grid-flow-row grid gap-2 gap-y-6 md:gap-4 lg:gap-6 grid-cols-2 sm:grid-cols-2">
        {collections.map((collection: Collection) => {
          return (
            <Link to={`/collections/${collection.handle}`} key={collection.id}>
                <div className="grid gap-4 relative">
                    {collection?.image && (
                        <Image
                            alt={`Image of ${collection.title}`}
                            data={collection.image}
                            key={collection.id}
                            sizes="(max-width: 32em) 100vw, 33vw"
                            crop="center"
                        />
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

const COLLECTIONS_QUERY = `#graphql
    query FeaturedCollections {
        jewelry: collectionByHandle(handle: "jewelry") {
            id
            title
            handle
            image {
                altText
                width
                height
                url
            }
        }
        bracelets: collectionByHandle(handle: "bracelets") {
            id
            title
            handle
            image {
                altText
                width
                height
                url
            }
        }
    }
`
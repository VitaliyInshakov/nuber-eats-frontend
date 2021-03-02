import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";

import { restaurantsPageQuery, restaurantsPageQueryVariables } from "../../__generated__/restaurantsPageQuery";
import Restaurant from "../../components/restaurant";

const RESTAURANTS_QUERY = gql`
    query restaurantsPageQuery($input: RestaurantsDto!) {
        allCategories {
            ok
            error
            categories {
                id
                name
                coverImage
                slug
                restaurantCount
            }
        }
        restaurants(input: $input) {
            ok
            error
            totalPages
            totalResults
            results {
                id
                name
                coverImage
                category {
                    name
                }
                isPromoted
            }
        }
    }
`;

const Restaurants = () => {
    const [page, setPage] = useState(1);
    const { data, loading } = useQuery<restaurantsPageQuery, restaurantsPageQueryVariables>(RESTAURANTS_QUERY, {
        variables: {
            input: {
                page,
            },
        },
    });

    const onNextPageClick = () => setPage(prevState => prevState++);
    const onPrevPageClick = () => setPage(prevState => prevState--);

    return (
        <div>
            <form className="bg-gray-800 w-full py-40 flex items-center justify-center">
                <input
                    className="input w-3/12 rounded-md border-0"
                    type="text"
                    placeholder="Search restaurants..."
                />
            </form>
            <div>
                {!loading &&
                    <div className="max-w-screen-2xl pb-20 mx-auto mt-8">
                        <div className="flex justify-around max-w-sm mx-auto">
                            {data?.allCategories.categories?.map(category => (
                                <div className="flex flex-col group items-center cursor-pointer">
                                    <div
                                        className="w-16 h-16 rounded-full bg-cover group-hover:bg-gray-100"
                                        style={{ backgroundImage: `url(${category.coverImage})` }}
                                    />
                                    <span className="text-sm text-center font-medium">{category.name}</span>
                                </div>
                            ))}
                        </div>
                        <div className="grid mt-16 grid-cols-3 gap-x-5 gap-y-10">
                            {data?.restaurants.results?.map(({ id, coverImage, name, category }) => (
                                <Restaurant
                                    id={id}
                                    coverImage={coverImage}
                                    name={name}
                                    categoryName={category?.name || ""}
                                />
                            ))}
                        </div>
                        <div className="grid grid-cols-3 text-center max-w-md items-center max-w-md mx-auto mt-10">
                            {page > 1 &&
                            <button
                                className="font-medium text-2xl focus:outline-none"
                                onClick={onPrevPageClick}
                            >&larr;</button>
                            }
                            <span className="mx-5">
                                Page {page} of {data?.restaurants.totalPages}
                            </span>
                            {page !== data?.restaurants.totalPages &&
                                <button
                                    className="font-medium text-2xl focus:outline-none"
                                    onClick={onNextPageClick}
                                >&rarr;</button>
                            }
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}

export default Restaurants;
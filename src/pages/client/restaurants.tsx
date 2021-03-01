import React from "react";
import { gql, useQuery } from "@apollo/client";
import { restaurantsPageQuery, restaurantsPageQueryVariables } from "../../__generated__/restaurantsPageQuery";

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
    const { data, loading } = useQuery<restaurantsPageQuery, restaurantsPageQueryVariables>(RESTAURANTS_QUERY, {
        variables: {
            input: {
                page: 1,
            },
        },
    });
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
                    <div className="max-w-screen-2xl mx-auto mt-8">
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
                        <div className="grid mt-10 grid-cols-3 gap-x-5 gap-y-10">
                            {data?.restaurants.results?.map(restaurant => (
                                <div>
                                    <div
                                        style={{ backgroundImage: `url(${restaurant.coverImage})` }}
                                        className="bg-red-500 bg-cover bg-center mb-3 py-28"
                                    />
                                    <h3 className="text-xl font-medium">{restaurant.name}</h3>
                                    <span className="border-t-2 border-gray-200">
                                      {restaurant.category?.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}

export default Restaurants;
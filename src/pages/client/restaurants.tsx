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
    const { data, loading, error } = useQuery<restaurantsPageQuery, restaurantsPageQueryVariables>(RESTAURANTS_QUERY, {
        variables: {
            input: {
                page: 1,
            },
        },
    });
    return (
        <h1>Restaurants</h1>
    );
}

export default Restaurants;
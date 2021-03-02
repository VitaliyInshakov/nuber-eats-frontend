import React, { FC } from "react";

interface IRestaurantProps {
    id: number;
    coverImage: string;
    name: string;
    categoryName: string;
}

const Restaurant: FC<IRestaurantProps> = ({
    categoryName,
    coverImage,
    name,
}) => {
    return (
        <div className="flex flex-col">
            <div
                style={{ backgroundImage: `url(${coverImage})` }}
                className="bg-red-500 bg-cover bg-center mb-3 py-28"
            />
            <h3 className="text-xl font-medium">{name}</h3>
            <span className="border-t mt-2 py-2 text-xs border-gray-400 opacity-50">
              {categoryName}
            </span>
        </div>
    );
};

export default Restaurant;
import React, { FC } from "react";

const FormError: FC<{errorMessage: string;}> = ({ errorMessage }) => (
    <span className="font-medium text-red-500">{errorMessage}</span>
);

export default FormError;
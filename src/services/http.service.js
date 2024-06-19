export const getData = async (path, options) => {
    const response = await fetch(path, options);
    // TODO: Add Error Handling
    return await response.json();
};

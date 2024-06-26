export const base64EncodeImage = (imageFile: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => {
            const base64String = reader.result as string;

            resolve(base64String);
        };

        reader.onerror = reject;

        reader.readAsDataURL(imageFile);
    });
};

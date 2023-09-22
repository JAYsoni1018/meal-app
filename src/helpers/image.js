import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
// import RNFS from 'react-native-fs';
import Animated from 'react-native-reanimated';


export const CachedImage = (props) => {
    const [cachedSource, setCachedSource] = useState(null);
    const { uri } = props;

    useEffect(() => {
        const getCachedImage = async () => {
            try {
                const cachedImageData = await AsyncStorage.getItem(uri);
                if (cachedImageData) {
                    setCachedSource({ uri: cachedImageData });
                } else {
                    const response = await fetch(uri);
                    const imageBlob = await response.blob();
                    const base64Data = await new Promise((resolve) => {
                        const reader = new FileReader();
                        reader.readAsDataURL(imageBlob);
                        reader.onloadend = () => {
                            resolve(reader.result);
                        };
                    });
                    await AsyncStorage.setItem(uri, base64Data);
                    setCachedSource({ uri: base64Data });
                }
            } catch (error) {
                console.error('Error caching image:', error);
                setCachedSource({ uri });
            }
        };

        // const getCachedImage = async (uri) => {
        //     try {
        //         // Define the cache directory path
        //         const cachePath = RNFS.CachesDirectoryPath + '/cachedImages';

        //         // Ensure the cache directory exists
        //         await RNFS.mkdir(cachePath, { NSURLIsExcludedFromBackupKey: true });

        //         // Extract the filename from the URI
        //         const filename = uri.split('/').pop();

        //         // Construct the full path for the cached image
        //         const cachedImagePath = `${cachePath}/${filename}`;

        //         // Check if the image is already cached
        //         const exists = await RNFS.exists(cachedImagePath);

        //         if (exists) {
        //             setCachedSource({ uri: `file://${cachedImagePath}` });
        //         } else {
        //             const response = await fetch(uri);
        //             const imageBlob = await response.blob();

        //             // Write the image data to the cache directory
        //             await RNFS.writeFile(cachedImagePath, imageBlob, 'base64');
        //             setCachedSource({ uri: `file://${cachedImagePath}` });
        //         }

        //         // Return the cached image path
        //         return cachedImagePath;
        //     } catch (error) {
        //         console.error('Error caching image:', error);
        //         setCachedSource({ uri });
        //         return null; // Return null in case of an error
        //     }

        // };
        getCachedImage();
    }, []);

    return <Animated.Image source={cachedSource} {...props} />;
};
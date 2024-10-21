import AsyncStorage from '@react-native-async-storage/async-storage';

// get
export const getStorageUser = async (key: string): Promise<any> => {
  try {
    const result = await AsyncStorage.getItem(key);
    return result ? JSON.parse(result) : null;
  } catch (error) {
    console.error('Error getting storage item', error);
    return null;
  }
};

export const getStorage = async (key: string): Promise<any | null> => {
  try {
    const result = await AsyncStorage.getItem(key);

    return result ? JSON.parse(result) : null;
  } catch (error) {
    console.error('Error getting storage item', error);
    return null;
  }
};

// set
export const setStorage = async (key: string, value: any): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(value);

    await AsyncStorage.setItem(key, jsonValue);
  } catch (error) {
    console.error('Error setting storage item', error);
  }
};
// remove
export const removeStorage = async (key: string) => {
  return await AsyncStorage.removeItem(key);
};

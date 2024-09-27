import Axios from 'axios';
import Config from 'react-native-config';

export const AxiosInstance = Axios.create({
  baseURL: 'https://maps.googleapis.com/maps/api',
  params: {
    key: Config.GOOGLE_MAPS_API_KEY,
  },
});

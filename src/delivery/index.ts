import { AxiosInstance } from './connector';
import MapActions from './map-actions';

class AppCore {
  connector = AxiosInstance;
  MapActions = MapActions;
}

export default new AppCore();

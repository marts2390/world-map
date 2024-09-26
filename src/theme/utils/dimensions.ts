import { Dimensions } from 'react-native';

const baseWidth = 375;
const baseHeight = 812;

const { width, height } = Dimensions.get('screen');

export const wpx = (size: number): number => (width / baseWidth) * size;

export const hpx = (size: number): number => (height / baseHeight) * size;

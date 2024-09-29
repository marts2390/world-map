// React
import React, { useCallback, useEffect, useState } from 'react';
// Native
import { ImageStyle, Image as RnImage } from 'react-native';

interface ImageProps {
  blob?: Blob;
  source?: RnImage['props']['source'];
  styles?: ImageStyle;
}

const blobToBase64 = (blob: Blob): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject('Failed to convert blob to base64');
      }
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });

export const Image = ({
  blob,
  styles,
  source,
}: ImageProps): React.ReactElement => {
  const [url, setUrl] = useState<string>();

  const handleBlob = useCallback(async (): Promise<void> => {
    if (!blob) return;

    const convert = await blobToBase64(blob);

    setUrl(convert);
  }, [blob]);

  useEffect(() => {
    handleBlob();
  }, [handleBlob]);

  return (
    <RnImage resizeMode="cover" source={source || { uri: url }} style={styles} />
  );
};

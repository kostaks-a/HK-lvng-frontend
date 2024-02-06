import { useState } from 'react';
import conversions from '../assets/conversions';

export const useConversion = () => {
  const [result, setResult] = useState('');

  const convert = (fromUnit, toUnit, amount, ingredient = null) => {
    let conversionResult;

    if (ingredient) {
      const weightPerUnit = conversions.volumeToWeight[ingredient]?.[fromUnit];
      if (weightPerUnit) {
        conversionResult = amount * weightPerUnit;
        if (toUnit !== 'gram') {
          // Additional logic to convert to other weight units if necessary
        }
      }
    } else {
      const volumeFactor = conversions.volumeToVolume[fromUnit]?.[toUnit];
      if (volumeFactor) {
        conversionResult = amount * volumeFactor;
      }
    }

    setResult(conversionResult ? `${conversionResult} ${toUnit}` : 'Conversion not possible');
  };

  return { convert, result };
};

/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { Container, Select, NumberInput, Button, Text } from '@mantine/core';
import { useConversion } from '../utils/useConversion';

function App() {
  const [fromUnit, setFromUnit] = useState('');
  const [toUnit, setToUnit] = useState('');
  const [amount, setAmount] = useState(0);
  const [ingredient, setIngredient] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { convert, result } = useConversion();

  return (
    <div style={{ marginTop: "50px" ,paddingTop: "250px" , display: "flex", flexDirection: "column", alignItems: "center"}}>
        {isLoading ? (
          <h1>Feature coming soon...</h1>
        ) : (
            <Container>
      <Select
        label="Ingredient (optional)"
        placeholder="Select ingredient"
        data={['flour', 'sugar', 'none']}
        value={ingredient}
        onChange={setIngredient}
        clearable
      />
      <NumberInput
        label="Amount"
        placeholder="Enter amount"
        value={amount}
        onChange={setAmount}
        required
      />
      <Select
        label="From Unit"
        placeholder="Select unit"
        data={['cup', 'tablespoon']}
        value={fromUnit}
        onChange={setFromUnit}
        required
      />
      <Select
        label="To Unit"
        placeholder="Select unit"
        data={['gram', 'cup', 'tablespoon', 'liter']}
        value={toUnit}
        onChange={setToUnit}
        required
      />
      <Button onClick={() => convert(fromUnit, toUnit, amount, ingredient === 'none' ? null : ingredient)}>Convert</Button>
      <Text>Result: {result}</Text>
    </Container>
          )}
    </div>
  );
}

export default App;

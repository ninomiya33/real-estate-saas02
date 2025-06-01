export async function estimatePrice({
    city_code,
    features
  }: {
    city_code: string;
    features: [number, number, number, number, number];
  }) {
    const response = await fetch('http://127.0.0.1:5001/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        city_code,
        features,
      }),
    });
  
    if (!response.ok) {
      throw new Error('AI査定APIエラー');
    }
  
    const data = await response.json();
  
    return {
      predicted_price: data.predicted_price,
    };
  }
  
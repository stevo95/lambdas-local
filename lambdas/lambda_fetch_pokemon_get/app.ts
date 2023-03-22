import { APIGatewayEvent, Handler } from 'aws-lambda';
import { fetchPokemon } from '/opt/general_layer/helperFunctions';

export const lambdaHandler: Handler = async (
  event: APIGatewayEvent,
): Promise<{
    statusCode: number; 
    headers?: {
        'Content-Type': string;
    };
    isBase64Encoded?: boolean;
    body: string;
}> => {
    try {
        const pokemon = await fetchPokemon();

        if (!pokemon) {
            throw new Error('Failed to fetch pokemon!');
        }

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
            },
            isBase64Encoded: false,
            body: JSON.stringify({
                message: 'Pokemon fetched.',
                data: pokemon
            })
        }
    } catch (err) {
        return { statusCode: 500, body: JSON.stringify(err) };
    }
}  
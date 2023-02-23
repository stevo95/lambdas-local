import { APIGatewayEvent, Handler } from 'aws-lambda';
import { diceRoll } from '/opt/general_layer/helperFunctions';

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
        const diceRollResult = diceRoll();

        if (
            typeof diceRollResult !== 'number' ||
            diceRollResult > 6 ||
            diceRollResult < 0
        ) {
            throw new Error('Invalid dice roll!');
        }

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
            },
            isBase64Encoded: false,
            body: JSON.stringify({
                message: 'Dice rolled.',
                number: diceRollResult
            })
        }
    } catch (err) {
        return { statusCode: 500, body: JSON.stringify(err) };
    }
}  
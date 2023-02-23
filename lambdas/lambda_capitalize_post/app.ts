import { APIGatewayEvent, Handler } from 'aws-lambda';
import { capitalize } from '/opt/general_layer/helperFunctions';

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
        if (!event.body) {
            throw new Error('Invalid event body!');
        }
        const body = JSON.parse(event.body);
        const toCapitalize = body.word;

        if (!toCapitalize) {
            throw new Error('Invalid request!');
        }

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
            },
            isBase64Encoded: false,
            body: JSON.stringify({
                message: 'Success.',
                number: capitalize(toCapitalize)
            })
        }
    } catch (err) {
        return { statusCode: 500, body: JSON.stringify(err) };
    }
}  
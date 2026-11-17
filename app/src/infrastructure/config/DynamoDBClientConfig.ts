import { DynamoDBClient } from '@aws-sdk/client-dynamodb';

const isLocal = process.env.LOCAL === 'true';
const region = process.env.AWS_REGION || 'us-east-1';

if (!region) {
    throw new Error('AWS_REGION environment variable is required');
}

const endpoint = isLocal 
    ? 'http://localhost:8000' 
    : `https://dynamodb.${region}.amazonaws.com`;

export const dynamoDBConfig = {
    region,
    endpoint,
    credentials: isLocal
        ? { accessKeyId: 'local', secretAccessKey: 'local' }
        : undefined
};

export const dynamoDBClient = new DynamoDBClient(dynamoDBConfig);

export { DynamoDBClient };
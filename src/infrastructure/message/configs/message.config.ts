export const messageConfig = {
    brokers: (process.env.KAFKA_BROKERS?.split(',') ?? ['10.100.0.1:9092']),
    clientId: process.env.KAFKA_CLIENT_ID ?? 'matchmaking-client',
    groupId: process.env.KAFKA_GROUP_ID ?? 'matchmaking-service',
};

export default messageConfig;

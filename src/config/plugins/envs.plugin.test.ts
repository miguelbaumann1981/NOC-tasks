import  { envs } from './envs.plugin';

describe('envs plugin', () => {
    test('should return env options', () => {
        expect(envs).toEqual({
            PORT: 3000,
            MAILER_EMAIL: 'miguelbaumann81@gmail.com',
            MAILER_SECRET_KEY: 'ukgwwhvwvnabpgfv',
            MAILER_SERVICE: 'gmail',
            PROD: true,
            MONGO_URL: 'mongodb://miguel:987654@localhost:27017',
            MONGO_DB_NAME: 'NOC-TEST',
            MONGO_USER: 'miguel',
            MONGO_PASS: '987654'
        });
    });


    test('should return error if not found env', async () => {
        jest.resetModules();
        process.env.PORT = 'ABC';

        try {
            await import('./envs.plugin');
            expect(true).toBe(false);
        } catch (error) {
            expect(`${error}`).toContain('"PORT" should be a valid integer');
        }
    })
})
import 'dotenv/config';

const parseEnv = () => {
    const envVars = process.env;
    const mitsoVars = [];

    for (const [key, value] of Object.entries(envVars)) {
        if (key.startsWith('MITSO_')) {
            mitsoVars.push(`${key}=${value}`);
        }
    }

    console.log(mitsoVars.join('; '));
};

parseEnv();
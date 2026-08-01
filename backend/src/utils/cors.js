const allowedOrigins = [
    "https://zen-mind.dev",
    "https://www.zen-mind.dev",

    "http://localhost:5173",

];

export const corsOptions = {
    origin(origin, callback) {

        if (!origin) return callback(null, true);

        const allowed = allowedOrigins.some((item) => {
            if (item instanceof RegExp) {
                return item.test(origin);
            }

            return item === origin;
        });

        if (allowed) {
            return callback(null, true);
        }

        return callback(new Error(`CORS blocked for origin: ${origin}`));
    },

    credentials: true,
};
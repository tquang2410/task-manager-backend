const delay = (req, res, next) => {
    console.log(`⏳ Delaying ${req.method} ${req.url} for 3 seconds...`);

    // Simulate delay of 3 seconds
    setTimeout(() => {
        console.log(` Delay completed for ${req.method} ${req.url}`);

        // Optional: Check authorization if needed
        if (req.headers.authorization) {
            const token = req.headers.authorization.split(' ')[1];
            if (!token) {
                return res.status(401).json({
                    success: false,
                    EM: 'Unauthorized - Invalid token format'
                });
            }
            console.log(` Token found: ${token.substring(0, 20)}...`);
        }

        next(); // Continue to actual route handler
    }, 3000); // 3 seconds delay
};

module.exports = delay;
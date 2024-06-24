import { registerAs } from '@nestjs/config';

export const jwtConfig = registerAs('jwt', () => {
  return {
    accessToken: {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: 1000 * 60 * 15, // 15 minutes
    },
    refreshToken: {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: 1000 * 60 * 60 * 24 * 7 * 4, // 4 weeks (1 month)
    },
  };
});

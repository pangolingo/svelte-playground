import { SvelteKitAuth } from '@auth/sveltekit';
import Auth0Provider from '@auth/core/providers/auth0';
import { AUTH0_ID, AUTH0_SECRET, AUTH0_DOMAIN } from '$env/static/private';

export const handle = SvelteKitAuth({
	providers: [
		Auth0Provider({
			clientId: AUTH0_ID,
			clientSecret: AUTH0_SECRET,
			issuer: AUTH0_DOMAIN
		})
	],
	// is trustHost required? what does it mean?
	trustHost: true,
	callbacks: {
		// add sub to the user in the session and client
		async session({ session, token }) {
			if (session.user) {
				session.user.sub = token.sub;
			}
			return session;
		}
	}
});

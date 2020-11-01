import buildClient from '../api/build-client';

const LandingPage = ({ currentUser }) => {
	return currentUser ? (
		<h1>You are signed in</h1>
	) : (
		<h1>You are not signed in</h1>
	);
};

LandingPage.getInitialProps = async (context) => {
	const client = buildClient(context);

	const { data } = await client.get('/api/users/currentuser');

	return data;
};

export default LandingPage;

// http://__service__.__namespace__.svc.clster.local
// http://ingress-nginx-controller.ingress-nginx.svc.cluster.local

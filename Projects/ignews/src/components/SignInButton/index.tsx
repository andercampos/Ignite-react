import { FaGithub } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';
import { signIn, signOut, useSession } from 'next-auth/client';

import styles from './styles.module.scss';

const handleGithubSignIn = () => {
	signIn('github');
};

const handleSignOut = () => {
	signOut();
};

export function SignInButton() {
	const [session] = useSession();

	return session ? (
		<button
			type='button'
			className={styles.signInButton}
			onClick={handleSignOut}>
			<FaGithub color='#04d361' />
			{session.user.name}
			<FiX color='#737380' className={styles.closeIcon} />
		</button>
	) : (
		<button
			type='button'
			className={styles.signInButton}
			onClick={handleGithubSignIn}>
			<FaGithub color='#eba417' />
			Sign in with Github
		</button>
	);
}

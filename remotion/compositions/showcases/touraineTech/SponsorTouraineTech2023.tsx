import {AbsoluteFill} from 'remotion';

import {BackgroundTriangle} from '../../../design/atoms/BackgroundTriangle';
import {SponsorLogo} from '../../templates/sponsor/SponsorLogo';

import {Logo} from './Logo';
import {TalkTitle} from './TalkTitle';

export type SponsorProps = {
	message: string;
	sponsorLogo: string;
};

export const SponsorTouraineTech2023: React.FC<SponsorProps> = ({
	message,
	sponsorLogo,
}) => {
	return (
		<AbsoluteFill style={{backgroundColor: 'white', overflow: 'hidden'}}>
			<Logo />
			<BackgroundTriangle primaryColor={'#6abfad'} secondaryColor={'#222333'} />

			<TalkTitle title={message} />
			<SponsorLogo
				sponsorLogo={sponsorLogo}
				style={{
					top: 250,
					margin: '0 auto',
					filter: 'none',
					left: 0,
					right: 0,
				}}
			/>
		</AbsoluteFill>
	);
};

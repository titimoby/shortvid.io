import {AbsoluteFill, Img, staticFile} from 'remotion';
import React from 'react';
import {RightTriangle} from './RightTriangle';
import {LeftTriangle} from './LeftTriangle';
import {GreenScreen} from './GreenScreen';

export const LayerTwoSpeaker: React.FC = () => {
	return (
		<AbsoluteFill style={{backgroundColor: 'white', overflow: 'hidden'}}>
			<RightTriangle />
			<LeftTriangle />
			<Img
				style={{
					zIndex: 1,
					width: 700,
					position: 'absolute',
					bottom: -10,
					right: -250,
				}}
				src={staticFile('lion-model.webp')}
			/>
			<div
				style={{
					zIndex: 2,
					display: 'inline-flex',
					paddingTop: 150,
				}}
			>
				<GreenScreen style={{width: '50%', margin: 20}} />
				<GreenScreen style={{width: '50%', margin: 20}} />
			</div>
		</AbsoluteFill>
	);
};
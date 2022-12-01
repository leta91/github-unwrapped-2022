import React, {SVGProps} from 'react';
import {random} from 'remotion';
import {getRough} from '../get-rough';

export const IssueCircle: React.FC<
	SVGProps<SVGEllipseElement> & {
		size: number;
		seed: number;
	}
> = ({size, seed, ...props}) => {
	const path = getRough().generator();
	const drawable = path.circle(
		Number(props.cx),
		Number(props.cy),
		Number(props.r) * 2,
		{
			roughness: 0.3,
			fill: props.fill,
			seed: seed,
			maxRandomnessOffset: 4,
			hachureAngle: random(seed) * 360,
			hachureGap: size / 10,
			strokeWidth: size / 7,
			stroke: 'none',
		}
	);

	const paths = path.toPaths(drawable);
	return (
		<>
			{paths.map((p) => {
				const {d, stroke, strokeWidth, fill} = p;
				return (
					<path
						key={p.d}
						d={d}
						stroke={stroke}
						strokeWidth={strokeWidth}
						fill={fill}
					></path>
				);
			})}
		</>
	);
};

import React from 'react';
import styles from './importance-level.module.scss';
interface ImportanceLevelProps {
	level: number;
}

export const ImportanceLevel: React.FC<ImportanceLevelProps> = ({ level }) => {
	let className;
	if (level === 1) {
		className = 'green';
	} else if (level === 2) {
		className = 'yellow';
	} else {
		className = 'red';
	}
	return <div className={styles[className] + ' ' + styles.level}></div>;
};

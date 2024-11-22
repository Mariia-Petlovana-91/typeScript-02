import css from '../Section/Section.module.css';

type Props = {
  children: React.ReactNode;
};

export default function Section({children}:Props) {
	return (
		<section className={css.sectionContainer}>
                {children}
		</section>
	)
}
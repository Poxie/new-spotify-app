import { useRouter } from 'next/router';
import styles from '../../styles/TopLists.module.scss'
import { Dropdown } from '../dropdown';
import { TopListHeaderTracks } from './TopListHeaderTracks';

const COUNTRIES = ["Global", "Albania", "Algeria", "Andorra", "Angola", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bangladesh", "Belgium", "Bolivia", "Brazil", "Bulgaria", "Cambodia", "Canada", "CAR", "Chile", "Colombia", "Costa Rica", "Cote D'Ivoire", "Cyprus", "Czech Republic", "Denmark", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Estonia", "Faroe Islands", "Finland", "France", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Guatemala", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kyrgyzstan", "Latvia", "Lebanon", "Liechtenstein", "Lithuania", "Luxembourg", "Malaysia", "Malta", "Mexico", "Monaco", "Montserrat", "Morocco", "Myanmar", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Norway", "Pakistan", "Panama", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Romania", "Saint Lucia", "San Marino", "Saudi Arabia", "Serbia", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Somalia", "South Africa", "Spain", "Sri Lanka", "Sweden", "Switzerland", "Syrian Arab Republic", "Taiwan", "Tanzania", "Thailand", "Tunisia", "Turkey", "Turkmenistan", "Uganda", "Ukraine", "UAE", "United Kingdom", "United States", "Uruguay", "Venezuela", "Vietnam", "Zimbabwe"];

export const TopListHeader: React.FC<{
    country: string;
}> = ({ country }) => {
    const router = useRouter();
    const header = country === 'Global' ? 'globally' : `in ${country}`;

    const changeList = (item: string) => {
        router.replace(`/top-lists?country=${item}`, undefined, { shallow: true });
    }

    return(
        <section className={styles['header-section']}>
            <div className={styles['header-container']}>
                <h1 className={styles['header-text']}>
                    Top songs
                    {' '}
                    <span className={styles['highlight']}>
                        {header}
                    </span>
                </h1>

                <Dropdown 
                    items={COUNTRIES}
                    onChange={changeList}
                    defaultSelected={country}
                    allowSearch={true}
                />
            </div>

            <TopListHeaderTracks 
                country={country}
            />
        </section>
    )
}
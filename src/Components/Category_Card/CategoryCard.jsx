import React from 'react'
import styles from './Category.module.css'
import { GroupCloth } from '../../Assets/Images/Image'
const CategoryCard = () => {
    return (
        <div className={styles.mainCard}>
            <img src={GroupCloth} alt="" className={styles.mainImg} loading='lazy' />
            <span className={styles.imgTitle}>Cloths</span>
        </div>
    )
}

export default CategoryCard
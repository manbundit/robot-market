import styles from 'styles/component/general/filter.module.scss'

export default function Filter({ list, onChange, selectedValue }) {
  const handleChange = (value) => {
    if (value === selectedValue) {
      return onChange(null)
    }
    onChange(value)
  }
  return (
    <div className={styles.filterWrapper}>
      {
        list.map(value => (
          <span key={value} onClick={() => handleChange(value)} className={`${value === selectedValue && styles.active}`}>
            {value}
          </span>
        ))
      }
    </div>
  )
}
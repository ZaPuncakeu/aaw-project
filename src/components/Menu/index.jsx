import { Link } from 'react-router-dom';
import './Menu.scss'

export default function SideMenu() {
  const buttons = [
    {
      link: '/admin/animals',
      text: 'Animals'
    },
    {
      link: '/admin/attractions',
      text: 'Attractions'
    },
  ]
  return (
    <aside className='admin-menu'>
      <h1>- Admin -</h1>
      <div>
      {
        buttons.map((btn, index) => {
          return(
            <Link to={btn.link} key={'menu-'+index}>
              <button>
                {btn.text}
              </button>
            </Link>
          )
        })
      }
      </div>
    </aside>
  );
}

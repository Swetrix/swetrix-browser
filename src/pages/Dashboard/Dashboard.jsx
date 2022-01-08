import React, { memo } from 'react'
import { Link } from 'react-router-dom'
import cx from 'classnames'
import dayjs from 'dayjs'
import _isEmpty from 'lodash/isEmpty'
import _isNumber from 'lodash/isNumber'
import _map from 'lodash/map'
import _filter from 'lodash/filter'
import { EyeIcon } from '@heroicons/react/outline'
import { CalendarIcon } from '@heroicons/react/outline'
import { ArrowSmUpIcon } from '@heroicons/react/solid'
import { ArrowSmDownIcon } from '@heroicons/react/solid'

import { ActivePin, InactivePin } from '../../ui/Pin'
import PulsatingCircle from '../../ui/icons/PulsatingCircle'
import Loading from '../../components/Loading'
import { isAuthenticated } from '../../hoc/protected'
import routes from '../../routes'

const ProjectCart = ({
  name, url, created, active, overall, live, isPublic,
}) => {
  const statsDidGrowUp = overall?.percChange >= 0

  return (
    <li>
      <Link to={url} className='block hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-800 dark:border-gray-700'>
        <div className='px-3 py-3'>
          <div className='flex items-center justify-between'>
            <p className='text-lg font-medium text-indigo-600 dark:text-gray-50 truncate'>
              {name}
            </p>
            <div className='ml-2 flex-shrink-0 flex'>
              {active ? (
                <ActivePin label='Active' />
              ) : (
                <InactivePin label='Disabled' />
              )}
              {isPublic && (
                <ActivePin label='Public' className='ml-2' />
              )}
            </div>
          </div>
          <div className='sm:flex sm:justify-between'>
            <div className='sm:flex flex-col'>
              <div className='flex items-center mt-2 text-sm text-gray-500 dark:text-gray-300'>
                <EyeIcon className='flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400 dark:text-gray-300' />
                Pageviews:
                &nbsp;
                <dd className='flex items-baseline'>
                  <p className='h-5 mr-1'>
                    {overall?.thisWeek}
                  </p>
                  <p className={cx('flex text-xs -ml-1 items-baseline', {
                    'text-green-600': statsDidGrowUp,
                    'text-red-600': !statsDidGrowUp,
                  })}>
                    {statsDidGrowUp ? (
                      <>
                        <ArrowSmUpIcon className='self-center flex-shrink-0 h-4 w-4 text-green-500' />
                        <span className='sr-only'>
                          Increased
                        </span>
                      </>
                    ) : (
                      <>
                        <ArrowSmDownIcon className='self-center flex-shrink-0 h-4 w-4 text-red-500' />
                        <span className='sr-only'>
                          Decreased
                        </span>
                      </>
                    )}
                    {overall?.percChange}%
                  </p>
                </dd>
              </div>
              <div className='flex items-center text-sm text-gray-500 dark:text-gray-300'>
                <PulsatingCircle className='flex-shrink-0 mr-3 ml-1' />
                Live visitors:
                &nbsp;
                {live}
              </div>
            </div>
            <div className='flex items-center text-sm text-gray-500 dark:text-gray-300'>
              <CalendarIcon className='flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400 dark:text-gray-300' />
              <p>
                Created at
                &nbsp;
                <time dateTime={dayjs(created).format('YYYY-MM-DD')}>
                  {dayjs(created).locale('en').format('MMMM D, YYYY')}
                </time>
              </p>
            </div>
          </div>
        </div>
      </Link>
    </li>
  )
}

const NoProjects = () => (
  <div className='mt-5'>
    <h3 className='text-center'>
      You have no projects yet
    </h3>
    {/* <p className='text-center'>
      You can create a project here
    </p> */}
  </div>
)

const Wrapper = ({ children }) => (
  <div className='px-4 py-4 w-full'>
    <h2 className='text-2xl font-extrabold text-gray-900'>
      Dashboard
    </h2>
    {children}
  </div>
)

const Dashboard = ({ projects, isLoading }) => {
  console.log(projects, isLoading)
  if (!isLoading) {
    return (
      <Wrapper>
        {_isEmpty(projects) ? (
          <NoProjects />
        ) : (
          <div className='bg-white shadow overflow-hidden sm:rounded-md mt-2'>
            <ul className='divide-y divide-gray-200'>
              {_map(_filter(projects, ({ uiHidden }) => !uiHidden), ({ name, id, created, active, overall, live, public: isPublic }) => (
                <ProjectCart
                  key={id}
                  name={name}
                  created={created}
                  active={active}
                  isPublic={isPublic}
                  overall={overall}
                  live={_isNumber(live) ? live : 'N/A'}
                  url={routes.project.replace(':id', id)}
                />
              ))}
            </ul>
          </div>
        )}
      </Wrapper>
    )
  }

  return (
    <Wrapper>
      <Loading />
    </Wrapper>
  )
}

export default isAuthenticated(memo(Dashboard))

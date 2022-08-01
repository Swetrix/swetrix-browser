/* eslint-disable react/prop-types, react/jsx-child-element-spacing */
import React, { memo, useState, useMemo, Fragment } from 'react'
import {
  MapIcon, ViewListIcon,
} from '@heroicons/react/outline'
import { ArrowSmUpIcon, ArrowSmDownIcon, FilterIcon } from '@heroicons/react/solid'
import cx from 'clsx'
import PropTypes from 'prop-types'
import _keys from 'lodash/keys'
import _map from 'lodash/map'
import _isEmpty from 'lodash/isEmpty'
import _isFunction from 'lodash/isFunction'
import _reduce from 'lodash/reduce'
import _round from 'lodash/round'
import _floor from 'lodash/floor'
import _size from 'lodash/size'
import _slice from 'lodash/slice'
import _sum from 'lodash/sum'

import Progress from '../../ui/Progress'
import PulsatingCircle from '../../ui/icons/PulsatingCircle'
import InteractiveMap from './InteractiveMap'

const ENTRIES_PER_PANEL = 5
const iconClassName = 'w-6 h-6'

const PanelContainer = ({
  name, type, children, isOverview, activeFragment, setActiveFragment,
}) => (
  <div className={cx('relative bg-white dark:bg-gray-750 pt-2 px-4 min-h-72 shadow rounded-lg overflow-hidden', {
    'pb-2': isOverview,
    'pb-8': !isOverview,
  })}
  >
    <div className='flex items-center justify-between mb-2'>
      <h3 className='flex items-center text-lg leading-6 font-semibold text-gray-900 dark:text-gray-50'>
        {name}
      </h3>
      {type === 'cc' && (
        <div className='flex'>
          <ViewListIcon
            className={cx(iconClassName, 'cursor-pointer', {
              'text-blue-500': activeFragment === 0,
              'text-gray-900 dark:text-gray-50': activeFragment === 1,
            })}
            onClick={() => setActiveFragment(0)}
          />
          <MapIcon
            className={cx(iconClassName, 'ml-2 cursor-pointer', {
              'text-blue-500': activeFragment === 1,
              'text-gray-900 dark:text-gray-50': activeFragment === 0,
            })}
            onClick={() => setActiveFragment(1)}
          />
        </div>
      )}
    </div>
    <div className='flex flex-col h-full scroll-auto'>
      {children}
    </div>
  </div>
)

PanelContainer.propTypes = {
  name: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  isOverview: PropTypes.bool,
  activeFragment: PropTypes.number,
  setActiveFragment: PropTypes.func,
}

PanelContainer.propTypes = {
  isOverview: false,
  activeFragment: 0,
  setActiveFragment: () => {},
}

const Overview = ({
  overall, chartData, activePeriod, live,
}) => {
  const pageviewsDidGrowUp = overall.percChange >= 0
  const uniqueDidGrowUp = overall.percChangeUnique >= 0
  const pageviews = _sum(chartData?.visits) || 0
  const uniques = _sum(chartData?.uniques) || 0

  return (
    <PanelContainer isOverview name='Overview'>
      <div className='flex text-lg justify-between'>
        <div className='flex items-center dark:text-gray-50'>
          <PulsatingCircle className='mr-1.5' type='big' />
          Live visitors:
        </div>
        <p className='h-5 mr-2 text-gray-900 dark:text-gray-50 text-xl'>
          {live}
        </p>
      </div>
      {!_isEmpty(chartData) && (
        <>
          <p className='text-lg font-semibold dark:text-gray-50'>
            Stats for
            <span className='lowercase'>
              &nbsp;
              {activePeriod.label}
            </span>
          </p>

          <div className='flex justify-between'>
            <p className='text-lg dark:text-gray-50'>
              Pageviews:
            </p>
            <p className='h-5 mr-2 text-gray-900 dark:text-gray-50 text-xl'>
              {pageviews}
            </p>
          </div>

          <div className='flex justify-between'>
            <p className='text-lg dark:text-gray-50'>
              Unique:
            </p>
            <p className='h-5 mr-2 text-gray-900 dark:text-gray-50 text-xl'>
              {uniques}
            </p>
          </div>
          <hr className='my-2' />
        </>
      )}
      <p className='text-lg font-semibold dark:text-gray-50'>
        Weekly stats
      </p>
      <div className='flex justify-between'>
        <p className='text-lg dark:text-gray-50'>
          Pageviews:
        </p>
        <dd className='flex items-baseline'>
          <p className='h-5 mr-2 text-gray-900 dark:text-gray-50 text-lg'>
            {overall.thisWeek}
          </p>
          <p className={cx('flex text-sm -ml-1 items-baseline', {
            'text-green-600': pageviewsDidGrowUp,
            'text-red-600': !pageviewsDidGrowUp,
          })}
          >
            {pageviewsDidGrowUp ? (
              <>
                <ArrowSmUpIcon className='self-center flex-shrink-0 h-4 w-4 text-green-500' />
                <span className='sr-only'>
                  Increase
                </span>
              </>
            ) : (
              <>
                <ArrowSmDownIcon className='self-center flex-shrink-0 h-4 w-4 text-red-500' />
                <span className='sr-only'>
                  Decrease
                </span>
              </>
            )}
            {overall.percChange}%
          </p>
        </dd>
      </div>
      <div className='flex justify-between'>
        <p className='text-lg dark:text-gray-50'>
          Unique:
        </p>
        <dd className='flex items-baseline'>
          <p className='h-5 mr-2 text-gray-900 dark:text-gray-50 text-lg'>
            {overall.thisWeekUnique}
          </p>
          <p className={cx('flex text-sm -ml-1 items-baseline', {
            'text-green-600': uniqueDidGrowUp,
            'text-red-600': !uniqueDidGrowUp,
          })}
          >
            {uniqueDidGrowUp ? (
              <>
                <ArrowSmUpIcon className='self-center flex-shrink-0 h-4 w-4 text-green-500' />
                <span className='sr-only'>
                  Increase
                </span>
              </>
            ) : (
              <>
                <ArrowSmDownIcon className='self-center flex-shrink-0 h-4 w-4 text-red-500' />
                <span className='sr-only'>
                  Decrease
                </span>
              </>
            )}
            {overall.percChangeUnique}
            %
          </p>
        </dd>
      </div>
    </PanelContainer>
  )
}

const CustomEvents = ({
  customs, chartData,
}) => {
  const keys = _keys(customs)
  const uniques = _sum(chartData.uniques)

  return (
    <PanelContainer name='Custom events'>
      <table className='table-fixed text-base'>
        <thead>
          <tr>
            <th className='w-4/6 text-left text-gray-900 dark:text-gray-50'>Event</th>
            <th className='w-1/6 text-right text-gray-900 dark:text-gray-50'>Quantity&nbsp;&nbsp;</th>
            <th className='w-1/6 text-right text-gray-900 dark:text-gray-50'>Conversion</th>
          </tr>
        </thead>
        <tbody>
          {_map(keys, (ev) => (
            <tr key={ev}>
              <td className='text-left'>{ev}</td>
              <td className='text-right'>{customs[ev]}&nbsp;&nbsp;</td>
              <td className='text-right'>{_round((customs[ev] / uniques) * 100, 2)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </PanelContainer>
  )
}

CustomEvents.propTypes = {
  customs: PropTypes.objectOf(PropTypes.number).isRequired,
  chartData: PropTypes.object.isRequired,
}

const Panel = ({
  name, data, rowMapper, capitalize, linkContent, hideFilters, onFilter, type,
}) => {
  const [page, setPage] = useState(0)
  const currentIndex = page * ENTRIES_PER_PANEL
  const keys = useMemo(() => _keys(data).sort((a, b) => data[b] - data[a]), [data])
  const keysToDisplay = useMemo(() => _slice(keys, currentIndex, currentIndex + 5), [keys, currentIndex])
  const total = useMemo(() => _reduce(keys, (prev, curr) => prev + data[curr], 0), [keys]) // eslint-disable-line
  const [activeFragment, setActiveFragment] = useState(0)
  const canGoPrev = () => page > 0
  const canGoNext = () => page < _floor(_size(keys) / ENTRIES_PER_PANEL)

  const _onFilter = hideFilters ? () => {} : onFilter

  const onPrevious = () => {
    if (canGoPrev()) {
      setPage(page - 1)
    }
  }

  const onNext = () => {
    if (canGoNext()) {
      setPage(page + 1)
    }
  }

  if (type === 'cc' && activeFragment === 1 && !_isEmpty(data)) {
    return (
      <PanelContainer
        name={name}
        type={type}
        activeFragment={activeFragment}
        setActiveFragment={setActiveFragment}
      >
        <InteractiveMap
          data={data}
          total={total}
        />
      </PanelContainer>
    )
  }

  return (
    <PanelContainer name={name} type={type} activeFragment={activeFragment} setActiveFragment={setActiveFragment}>
      {_isEmpty(data) ? (
        <p className='mt-1 text-base text-gray-700 dark:text-gray-300'>
          No data for this parameter yet
        </p>
      ) : _map(keysToDisplay, key => {
        const perc = _round(data[key] / total * 100, 2)
        const rowData = _isFunction(rowMapper) ? rowMapper(key) : key

        return (
          <Fragment key={key}>
            <div
              className={cx('flex text-base justify-between mt-1 dark:text-gray-50 rounded', {
                'group hover:bg-gray-100 hover:dark:bg-gray-700 cursor-pointer': !hideFilters,
              })}
              onClick={() => _onFilter(type, key)}
            >
              {linkContent ? (
                <a className={cx('flex label hover:underline text-blue-600 dark:text-blue-500', { capitalize })} href={rowData} target='_blank' rel='noopener noreferrer'>
                  {rowData}
                  {!hideFilters && (
                    <FilterIcon className='ml-2 w-4 text-gray-500 hidden group-hover:block dark:text-gray-300' />
                  )}
                </a>
              ) : (
                <span className={cx('flex label', { capitalize })}>
                  {rowData}
                  {!hideFilters && (
                    <FilterIcon className='ml-2 w-4 text-gray-500 hidden group-hover:block dark:text-gray-300' />
                  )}
                </span>
              )}
              <span className='ml-3 dark:text-gray-50'>
                {data[key]}
                &nbsp;
                <span className='text-gray-500 dark:text-gray-200 font-light'>({perc}%)</span>
              </span>
            </div>
            <Progress now={perc} />
          </Fragment>
        )
      })}
      {_size(keys) > 5 && (
        <div className='absolute bottom-0 w-card-toggle'>
          <div className='flex justify-between select-none mb-2'>
            <span
              className={cx('text-gray-500 dark:text-gray-200 font-light', {
                hoverable: canGoPrev(),
                disabled: !canGoPrev(),
              })}
              role='button'
              onClick={onPrevious}
            >
              &lt;
              &nbsp;
              Previous
            </span>
            <span
              className={cx('text-gray-500 dark:text-gray-200 font-light', {
                hoverable: canGoNext(),
                disabled: !canGoNext(),
              })}
              role='button'
              onClick={onNext}
            >
              Next
              &nbsp;
              &gt;
            </span>
          </div>
        </div>
      )}
    </PanelContainer>
  )
}

Panel.propTypes = {
  name: PropTypes.string.isRequired,
  data: PropTypes.objectOf(PropTypes.number).isRequired,
  rowMapper: PropTypes.func,
  capitalize: PropTypes.bool,
  linkContent: PropTypes.bool,
  hideFilters: PropTypes.bool,
  onFilter: PropTypes.func,
  type: PropTypes.string,
}

Panel.defaultProps = {
  rowMapper: null,
  type: null,
  capitalize: false,
  linkContent: false,
  onFilter: () => {},
  hideFilters: false,
}

const PanelMemo = memo(Panel)
const OverviewMemo = memo(Overview)
const CustomEventsMemo = memo(CustomEvents)

export {
  PanelMemo as Panel,
  OverviewMemo as Overview,
  CustomEventsMemo as CustomEvents,
}

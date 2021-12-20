import { ArrowDownWhite } from 'components/Icon/Arrows';
import Table from 'components/Table';
import CommenBasses from 'components/Tokens/CommenBasses';
import { useTokensData } from 'hooks/useToken';
import { TokenBalancesView } from 'near/FT';
import { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { IoCloseOutline } from 'react-icons/io5';
import { FormattedMessage, useIntl } from 'react-intl';
import MicroModal from 'react-micro-modal';
import { TokenMetadata } from 'store/Database';
import { isMobile } from 'utils/device';
import { toRealSymbol } from 'utils/token';
import AddToken from './AddToken';

function sort(a: any, b: any) {
  if (typeof a === 'string' && typeof b === 'string') {
    return a.localeCompare(b);
  } else if (typeof a === 'number' && typeof b === 'number') {
    return a - b;
  } else {
    return a;
  }
}

export default function SelectToken({
  tokens,
  selected,
  render,
  onSelect,
  standalone,
  placeholder,
  balances,
}: {
  tokens: TokenMetadata[];
  selected: string | React.ReactElement;
  standalone?: boolean;
  placeholder?: string;
  render?: (token: TokenMetadata) => string;
  onSelect?: (token: TokenMetadata) => void;
  onSearch?: (value: string) => void;
  balances?: TokenBalancesView;
}) {
  const [visible, setVisible] = useState(false);
  const [listData, setListData] = useState<TokenMetadata[]>([]);
  const [currentSort, setSort] = useState<string>('down');
  const [sortBy, setSortBy] = useState<string>('near');
  const addToken = () => <AddToken />;

  if (!onSelect) {
    return (
      <button className="p-1 focus:outline-none" type="button">
        {selected}
      </button>
    );
  }
  const dialogWidth = isMobile() ? '75%' : '35%';
  const dialogMinwidth = isMobile() ? 340 : 490;
  const dialogHidth = isMobile() ? '95%' : '57%';
  const intl = useIntl();
  const {
    tokensData,
    loading: loadingTokensData,
    trigger,
  } = useTokensData(tokens, balances);
  useEffect(() => {
    trigger();
  }, [trigger]);

  useEffect(() => {
    if (!loadingTokensData) {
      const sortedData = [...tokensData].sort(sortTypes[currentSort].fn);
      setListData(sortedData);
    }
  }, [loadingTokensData, tokensData]);

  useEffect(() => {
    if (!!tokensData) {
      const sortedData = [...tokensData].sort(sortTypes[currentSort].fn);
      setListData(sortedData);
    }
  }, [currentSort, sortBy]);

  const sortTypes: { [key: string]: any } = {
    up: {
      class: 'sort-up',
      fn: (a: any, b: any) => sort(a[sortBy], b[sortBy]),
    },
    down: {
      class: 'sort-down',
      fn: (a: any, b: any) => sort(b[sortBy], a[sortBy]),
    },
    default: {
      class: 'sort',
      fn: (a: any, b: any) => a,
    },
  };

  const onSortChange = (params: string) => {
    if (params === sortBy) {
      let nextSort;
      if (currentSort === 'down') nextSort = 'up';
      else if (currentSort === 'up') nextSort = 'down';
      setSort(nextSort);
    } else {
      setSort('up');
    }
    setSortBy(params);
  };

  const onSearch = (value: string) => {
    const result = tokensData.filter(({ symbol }) =>
      toRealSymbol(symbol)
        .toLocaleUpperCase()
        .includes(value.toLocaleUpperCase()),
    );
    setListData(result);
  };

  const handleClose = () => {
    const sortedData = [...tokensData].sort(sortTypes[currentSort].fn);
    setListData(sortedData);
    setVisible(false);
  };

  return (
    <MicroModal
      open={visible}
      handleClose={handleClose}
      trigger={() => (
        <div
          className={`focus:outline-none  ${standalone ? 'w-full' : 'w-2/5'}`}
          onClick={() => setVisible(true)}
        >
          {selected || (
            <section
              className={`flex justify-between items-center px-3 py-2 ${
                standalone
                  ? 'bg-inputDarkBg text-white relative flex overflow-hidden rounded align-center my-2'
                  : ''
              }`}
            >
              <p
                className="text-lg font-semibold leading-none text-gray-400"
                style={{ lineHeight: 'unset' }}
              >
                {placeholder ?? 'Select'}
              </p>
              <div className="pl-2">
                <ArrowDownWhite />
              </div>
            </section>
          )}
        </div>
      )}
      overrides={{
        Overlay: {
          style: {
            zIndex: 110,
            backgroundColor: 'rgba(0, 19, 32, 0.65)',
          },
        },
        Dialog: {
          style: {
            width: dialogWidth,
            minWidth: dialogMinwidth,
            borderRadius: '0.75rem',
            border: '1px solid rgba(0, 198, 162, 0.5)',
            padding: '1.5rem 0',
            background: '#1D2932',
            height: dialogHidth,
            zIndex: 100,
          },
        },
      }}
    >
      {() => (
        <section className="text-white">
          <div className="relative flex items-center justify-between px-6 pb-5 pr-8">
            <h2 className="text-sm font-bold text-center">
              <FormattedMessage
                id="select_token"
                defaultMessage="Select Token"
              />
            </h2>
            <IoCloseOutline
              onClick={() => handleClose()}
              className="absolute text-2xl text-gray-400 cursor-pointer right-6"
            />
          </div>
          <div className="flex items-center justify-between mx-6 mb-5">
            <div className="flex items-center flex-auto pr-2 mr-4 text-gray-400 rounded bg-inputDarkBg">
              <input
                className={`text-sm outline-none rounded w-full py-2 px-3`}
                placeholder={intl.formatMessage({ id: 'search_token' })}
                onChange={(evt) => onSearch(evt.target.value)}
              />
              <FaSearch />
            </div>
            {addToken()}
          </div>
          <CommenBasses
            tokens={tokensData}
            onClick={(token) => {
              onSelect && onSelect(token);
              handleClose();
            }}
          />
          <Table
            sortBy={sortBy}
            currentSort={currentSort}
            onSortChange={onSortChange}
            tokens={listData}
            onClick={(token) => {
              onSelect && onSelect(token);
              handleClose();
            }}
            balances={balances}
          />
        </section>
      )}
    </MicroModal>
  );
}

import { registerTokenAndExchange } from 'near/token';
import { useState } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import { FormattedMessage, useIntl } from 'react-intl';
import MicroModal from 'react-micro-modal';
export default function AddToken() {
  const [tokenId, setTokenId] = useState<string>();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    return registerTokenAndExchange(tokenId!);
  };
  const intl = useIntl();

  return (
    <MicroModal
      trigger={(open) => (
        <button
          onClick={open}
          className="px-2 py-1 text-xs font-semibold text-gray-400 whitespace-pre border border-gray-400 focus:outline-none rounded-2xl"
        >
          <FormattedMessage id="add_token" defaultMessage="Add Token" />
        </button>
      )}
      overrides={{
        Overlay: {
          style: {
            zIndex: 120,
            backgroundColor: 'rgba(0, 19, 32, 0.85)',
          },
        },
        Dialog: {
          style: {
            borderRadius: '0.75rem',
            border: '1px solid rgba(0, 198, 162, 0.5)',
            padding: '1.5rem',
            background: '#1D2932',
          },
        },
      }}
    >
      {(close) => (
        <>
          <div className="flex justify-between pb-3 text-white">
            <span>
              <FormattedMessage id="add_token" defaultMessage="Add Token" />
            </span>
            <IoCloseOutline
              onClick={close}
              className="text-2xl text-gray-400 right-6"
            />
          </div>
          <input
            className="px-3 py-2 text-sm font-bold leading-tight bg-black bg-opacity-25 rounded-lg shadow appearance-none focus:outline-none w-96 xs:w-72 text-greenLight"
            type="text"
            placeholder={intl.formatMessage({ id: 'enter_token_address' })}
            value={tokenId}
            onChange={({ target }) => setTokenId(target.value)}
          />
          <div className="flex justify-center">
            <button
              onClick={(e) => {
                handleSubmit(e);
                close();
              }}
              className="flex flex-row items-center justify-center h-8 px-4 mt-5 mb-5 transition-colors rounded-lg shadow-lg text-buttonText focus:outline-none disabled:cursor-not-allowed"
              style={{
                background: 'linear-gradient(180deg, #00C6A2 0%, #008B72 100%)',
              }}
            >
              <FormattedMessage id="add_token" defaultMessage="Add Token" />
            </button>
          </div>
        </>
      )}
    </MicroModal>
  );
}

interface IKnightSVG {
  onClick: () => void
}

export const KnightSVG = ({ onClick }: IKnightSVG): JSX.Element => {
  return (
    <svg fill="#000000" height="80" width="80" viewBox="0 0 482.011 482.011" onClick={onClick}>
      <g>
        <path
          d="M367.549,434.234h-6.409c-1.072-5.303-2.053-11.634-2.922-18.399H93.277c-0.529,5.964-0.964,12.061-1.228,18.399h-0.436
      c-13.188,0-23.889,10.693-23.889,23.889s10.701,23.889,23.889,23.889h275.936c13.188,0,23.889-10.693,23.889-23.889
      S380.737,434.234,367.549,434.234z"
        />
        <path
          d="M111.396,202.132c1.85,2.621,4.682,4.402,7.855,4.947c3.157,0.545,6.423-0.194,9.051-2.053l43.361-30.702
      c5.35-3.794,12.644-3.313,17.466,1.159c11.804,10.933,28.43,14.993,43.936,10.739c11.929-3.266,21.82-11.143,27.885-21.586
      c2.271,17.504-6.283,44.589-58.633,78.673c-48.479,31.564-78.961,64.365-95.4,108.822h251.036
      c2.892-25.515,9.626-53.796,23.625-83.285c29.254-47.576,62.116-134.095-14.698-214.269
      C302.771-12.331,245.741-4.344,213.763,9.358c-15.552,6.655-22.94,24.3-17.092,40.023l-35.865-33.22
      c-2.005-1.858-5.007-2.169-7.371-0.763c-2.349,1.416-3.485,4.216-2.784,6.867l11.835,44.978c-4.324,3.569-8.29,7.574-11.37,12.395
      l-55.569,87.026c-2.644,4.16-2.52,9.503,0.326,13.531L111.396,202.132z"
        />
        <path
          d="M87.18,399.908h280.368c8.802,0,15.926-7.132,15.926-15.926c0-8.794-7.124-15.926-15.926-15.926H87.18
      c-8.802,0-15.926,7.132-15.926,15.926C71.255,392.777,78.378,399.908,87.18,399.908z"
        />
      </g>
    </svg>
  )
}

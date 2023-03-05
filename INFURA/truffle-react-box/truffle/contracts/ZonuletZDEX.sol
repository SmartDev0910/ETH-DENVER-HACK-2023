// ███████╗ ██████╗ ███╗   ██╗██╗   ██╗██╗     ███████╗████████╗
// ╚══███╔╝██╔═══██╗████╗  ██║██║   ██║██║     ██╔════╝╚══██╔══╝
//   ███╔╝ ██║   ██║██╔██╗ ██║██║   ██║██║     █████╗     ██║   
//  ███╔╝  ██║   ██║██║╚██╗██║██║   ██║██║     ██╔══╝     ██║   
// ███████╗╚██████╔╝██║ ╚████║╚██████╔╝███████╗███████╗   ██║   
// ╚══════╝ ╚═════╝ ╚═╝  ╚═══╝ ╚═════╝ ╚══════╝╚══════╝   ╚═╝                                                              
// zonulet.io
// SPDX-License-Identifier: MIT

// File: https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/interfaces/IUniswapV2Router01.sol

pragma solidity >=0.6.2;

interface IUniswapV2Router01 {
    function factory() external pure returns (address);
    function WETH() external pure returns (address);

    function addLiquidity(
        address tokenA,
        address tokenB,
        uint amountADesired,
        uint amountBDesired,
        uint amountAMin,
        uint amountBMin,
        address to,
        uint deadline
    ) external returns (uint amountA, uint amountB, uint liquidity);
    function addLiquidityETH(
        address token,
        uint amountTokenDesired,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline
    ) external payable returns (uint amountToken, uint amountETH, uint liquidity);
    function removeLiquidity(
        address tokenA,
        address tokenB,
        uint liquidity,
        uint amountAMin,
        uint amountBMin,
        address to,
        uint deadline
    ) external returns (uint amountA, uint amountB);
    function removeLiquidityETH(
        address token,
        uint liquidity,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline
    ) external returns (uint amountToken, uint amountETH);
    function removeLiquidityWithPermit(
        address tokenA,
        address tokenB,
        uint liquidity,
        uint amountAMin,
        uint amountBMin,
        address to,
        uint deadline,
        bool approveMax, uint8 v, bytes32 r, bytes32 s
    ) external returns (uint amountA, uint amountB);
    function removeLiquidityETHWithPermit(
        address token,
        uint liquidity,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline,
        bool approveMax, uint8 v, bytes32 r, bytes32 s
    ) external returns (uint amountToken, uint amountETH);
    function swapExactTokensForTokens(
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    ) external returns (uint[] memory amounts);
    function swapTokensForExactTokens(
        uint amountOut,
        uint amountInMax,
        address[] calldata path,
        address to,
        uint deadline
    ) external returns (uint[] memory amounts);
    function swapExactETHForTokens(uint amountOutMin, address[] calldata path, address to, uint deadline)
        external
        payable
        returns (uint[] memory amounts);
    function swapTokensForExactETH(uint amountOut, uint amountInMax, address[] calldata path, address to, uint deadline)
        external
        returns (uint[] memory amounts);
    function swapExactTokensForETH(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline)
        external
        returns (uint[] memory amounts);
    function swapETHForExactTokens(uint amountOut, address[] calldata path, address to, uint deadline)
        external
        payable
        returns (uint[] memory amounts);

    function quote(uint amountA, uint reserveA, uint reserveB) external pure returns (uint amountB);
    function getAmountOut(uint amountIn, uint reserveIn, uint reserveOut) external pure returns (uint amountOut);
    function getAmountIn(uint amountOut, uint reserveIn, uint reserveOut) external pure returns (uint amountIn);
    function getAmountsOut(uint amountIn, address[] calldata path) external view returns (uint[] memory amounts);
    function getAmountsIn(uint amountOut, address[] calldata path) external view returns (uint[] memory amounts);
}

// File: https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/interfaces/IUniswapV2Router02.sol

pragma solidity >=0.6.2;


interface IUniswapV2Router02 is IUniswapV2Router01 {
    function removeLiquidityETHSupportingFeeOnTransferTokens(
        address token,
        uint liquidity,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline
    ) external returns (uint amountETH);
    function removeLiquidityETHWithPermitSupportingFeeOnTransferTokens(
        address token,
        uint liquidity,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline,
        bool approveMax, uint8 v, bytes32 r, bytes32 s
    ) external returns (uint amountETH);

    function swapExactTokensForTokensSupportingFeeOnTransferTokens(
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    ) external;
    function swapExactETHForTokensSupportingFeeOnTransferTokens(
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    ) external payable;
    function swapExactTokensForETHSupportingFeeOnTransferTokens(
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    ) external;
}

// File: ZonuletZDEX.sol

pragma solidity >0.8.0;

contract ZonuletZDEX {
  address internal constant UNISWAP_ROUTER_ADDRESS = 0x590eaD7F6Ef611db78347EdF8906B7CA46388609; //  Router

  IUniswapV2Router02 public uniswapRouter;
  address private zonu = 0x216eD590Cb7Ec3417CAb82699ae493522fECf580;

  constructor() {
    uniswapRouter = IUniswapV2Router02(UNISWAP_ROUTER_ADDRESS);
  }
  
  function zonulet(uint zonuAmount, uint deadline) public payable {
    address[] memory path = new address[](2);
    path[0] = uniswapRouter.WETH();
    path[1] = zonu;

    uniswapRouter.swapETHForExactTokens{ value: msg.value }(zonuAmount, path, msg.sender, deadline);
    
    // refund leftover ROSE to user
    (bool success,) = msg.sender.call{ value: address(this).balance }("");
    require(success, "zonulet zap ROSE refund failed");
  }
  
  function getEstimatedMANTLEforZONU(uint zonuAmount) public view returns (uint[] memory) {
    return uniswapRouter.getAmountsIn(zonuAmount, getPathForMANTLEtoZONU());
  }
  
    function getEstimatedZONUforMANTLE(uint roseAmount) public view returns (uint[] memory) {
    return uniswapRouter.getAmountsOut(roseAmount, getPathForZONUtoMANTLE());
  }

  function getPathForMANTLEtoZONU() private view returns (address[] memory) {
    address[] memory path = new address[](2);
    path[0] = uniswapRouter.WETH();
    path[1] = zonu;
    
    return path;
  }
  
  function getPathForZONUtoMANTLE() private view returns (address[] memory) {
    address[] memory path = new address[](2);
    path[1] = zonu;
    path[0] = uniswapRouter.WETH();
    
    return path;
  }
  
  // important to receive ETH
  receive() payable external {}
}
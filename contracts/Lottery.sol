
pragma solidity >=0.5.0 <0.9.0;


/** 
 * @title Lottery
 * @dev Ether lotery that transfer contract amount to winner
*/  
contract Lottery {
    
    //list of players registered in lotery
    address payable[] public players;
    address public admin;
    
    
    /**
     * @dev makes 'admin' of the account at point of deployement
     */ 
    constructor() public {
        admin = msg.sender;
        //automatically adds admin on deployment
        players.push(payable(admin));
    }
    
    modifier onlyOwner() {
        require(admin == msg.sender, "You are not the owner");
        _;
    }
    
    
    /**
     * @dev requires the deposit of 0.1 ether and if met pushes on address on list
     */ 
    receive() external payable {
        //require that the transaction value to the contract is 0.1 ether
        require(msg.value == 1 ether , "Must send 0.1 ether amount");
        
        //makes sure that the admin can not participate in lottery
        require(msg.sender != admin);
        
        // pushing the account conducting the transaction onto the players array as a payable adress
        players.push(payable(msg.sender));
    }
    
    /**
     * @dev gets the contracts balance
     * @return contract balance
    */ 
    function getBalance() public view onlyOwner returns(uint){
        // returns the contract balance 
        return address(this).balance;
    }
    
    /**
     * @dev generates random int *WARNING* -> Not safe for public use, vulnerbility detected
     * @return random uint
     */ 
    function random() internal view returns(uint){
       return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, players.length)));
    }
    function addressesP() public view returns (uint){
        return players.length;
    }
    
    /** 
     * @dev picks a winner from the lottery, and grants winner the balance of contract
     */ 
    function pickWinner() public  {

        //makes sure that we have enough players in the lottery  
        require(players.length >= 1 , "Not enough players in the lottery");
        
        address payable winner;
        
        //selects the winner with random number
        winner = players[0];
        
        //transfers balance to winner
        winner.transfer( getBalance() /2 ); //gets only 90% of funds in contract
        payable(admin).transfer( getBalance()   ); //gets remaining amount AKA 10% -> must make admin a payable account
        
        
        //resets the plays array once someone is picked
       resetLottery(); 
        
    }
    
    /**
     * @dev resets the lottery
     */ 
    function resetLottery() internal {
        players = new address payable[](0);
    }

}
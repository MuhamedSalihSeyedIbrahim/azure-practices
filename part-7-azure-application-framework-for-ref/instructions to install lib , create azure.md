## INSTRUCTIONS TO INSTALL LIB , CREATE AZURE APP AND AZURE FUNCTION

<PRE>
TO INSTALL AZURE FRAMEWORK LIB:
npm i -g boilerplate-azure-function-app --save

TO CREATE AZURE APPLICATION:

create-function-app <APPLICATION NAME>



TO CREATE AZURE FUNCTION:

CD ./<APPLICATION PATH>
create-function <FUNCTION NAME> <HTTP_METHOD>

NOTE : FUNCTIONS MUST BE CREATED INSIDE THE AZURE APPLICATION

NOTE :
IN TSCONFIG.JSON UPDATE SOURCEMAP OPTION TO TRUE SO THAT IT ENABLE DEBUGGER BREAK POINTS
</PRE>
<cfcomponent extends="JSONUtil">

<cffunction name="getWarehouses" returntype="any" access="remote" returnformat="plain">

	<cftry>
    <cfquery name="qryWhs" datasource="TESTDATA">
		SELECT WHS, NAME, SHIPLIMIT, LICENSECAP
	 	FROM CPWHSMST
	 	WHERE ISCLOSED <>  'Y'
	</cfquery>
	<cfcatch>
		<cfthrow message="#cfcatch.detail# #cfcatch.message#">
	</cfcatch>
	</cftry>

	<cfset returnArray = queryToArray(qryWhs)>
	<cfcontent reset="yes">
	<cfreturn serializeToJSON(returnArray, true, true)>

</cffunction>


</cfcomponent>




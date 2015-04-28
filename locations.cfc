<cfcomponent extends="JSONUtil">

<cffunction name="addLocation" access="remote" returnformat="plain">

	<cfargument  name="whs" type="string" required="yes">
	<cfargument  name="pbi" type="string" required="yes">
	<cfargument  name="location" type="string" required="yes">

	<cfset var returnStruct = structNew()>
 	<cftry>
		<cfquery name="qryAddLocation" datasource="TESTDATA">
			INSERT INTO TESTDATA.CP1TAG
			(GIN, GINBALE, LOCATION, LOCDATE, SOURCE, WHS)
			VALUES (
			  <cfqueryparam value = '#left(trim(arguments.PBI),5)#' CFSQLTYPE = 'CF_SQL_CHAR' maxlength="5">
			 ,	<cfqueryparam value = '#MID(trim(arguments.PBI),6,7)#' CFSQLTYPE = 'CF_SQL_CHAR' maxlength="7">
			 ,	<cfqueryparam value = '#trim(arguments.location)#' CFSQLTYPE = 'CF_SQL_CHAR' maxlength="5">
			 , '#dateformat(now(), "yymmdd")#'
			 , 'W'
			 , 	<cfqueryparam value = '#arguments.whs#' CFSQLTYPE = 'CF_SQL_CHAR' maxlength="6">
			 )
		</cfquery>
		<cfcatch>
			<cfif cfcatch.nativeErrorCode EQ -803>
				<cftry>
					<cfquery name="qryAddLocation" datasource="TESTDATA">
						UPDATE TESTDATA.CP1TAG
						 SET LOCATION = <cfqueryparam value = '#trim(arguments.location)#' CFSQLTYPE = 'CF_SQL_CHAR' maxlength="5">
						 WHERE WHS = <cfqueryparam value = '#arguments.whs#' CFSQLTYPE = 'CF_SQL_CHAR' maxlength="6">
						      AND GIN = <cfqueryparam value = '#left(trim(arguments.PBI),5)#' CFSQLTYPE = 'CF_SQL_CHAR' maxlength="5">
						      AND GINBALE = <cfqueryparam value = '#MID(trim(arguments.PBI),6,7)#' CFSQLTYPE = 'CF_SQL_CHAR' maxlength="7">
					</cfquery>
					<cfcatch>
						<cfthrow message="#cfcatch.detail# #cfcatch.message#">
					</cfcatch>
				</cftry>
			<cfelse>
				<cfthrow message="#cfcatch.detail# #cfcatch.message#">
			</cfif>
		</cfcatch>

		<cfcatch>
			<cfthrow message="#cfcatch.detail# #cfcatch.message#">
		</cfcatch>
	</cftry>

	<cfset returnStruct['IDNO'] = "#arguments.PBI#">
	<cfreturn serializeToJSON(returnStruct, true, true)>

</cffunction>

<cffunction name="updateLocation" access="remote" returnformat="plain">

	<cftry>
	<cfquery name="qryUpdateLocation" datasource="TESTDATA">
		UPDATE TESTDATA.CP1TAG
			SET LOCATION = '#arguments.LOCATION#'
		WHERE
			GIN = '#left(arguments.PBI, 5)#'
			AND GINBALE = '#right(arguments.PBI, 7)#'
	</cfquery>
	<cfcatch>
		<cfthrow message="#cfcatch.message# #cfcatch.detail#">
	</cfcatch>
	</cftry>

	<cfset returnStruct = structNew()>
	<cfset returnStruct['IDNO'] = "#arguments.PBI#">
	<cfreturn serializeToJSON(returnStruct, true, true)>

</cffunction>

<cffunction name="deleteLocation" access="remote" returnformat="plain">

	<cftry>
	<cfquery name="qryDeleteLocation" datasource="TESTDATA">
		DELETE FROM TESTDATA.CP1TAG
		WHERE
			GIN = '#left(arguments.PBI, 5)#'
			AND GINBALE = '#right(arguments.PBI, 7)#'
	</cfquery>
	<cfcatch>
		<cfthrow message="#cfcatch.message# #cfcatch.detail#">
	</cfcatch>
	</cftry>

	<cfset returnStruct = structNew()>
	<cfset returnStruct['IDNO'] = "#arguments.PBI#">
	<cfreturn serializeToJSON(returnStruct, true, true)>

</cffunction>

<cffunction name="getLocations" access="remote" returnformat="plain">
<cfdump var="#cgi#">
	<cftry>
	<cfquery name="qryLocations" datasource="TESTDATA">
		SELECT GIN || GINBALE AS PBI, GIN || GINBALE AS IDNO
		 , GIN, GINBALE, LOCATION, LOCDATE, SOURCE, WHS
		FROM TESTDATA.CP1TAG
		WHERE WHS = '#arguments.whs#'
	</cfquery>
	<cfcatch>
		<cfthrow message="#cfcatch.message# #cfcatch.detail#">
	</cfcatch>
	</cftry>

	<cfset returnArray = queryToArray(qryLocations)>
	<cfreturn serializeToJSON(returnArray, true, true)>

</cffunction>

<cffunction name="getWarehouses" access="remote" returnformat="plain">

	<cftry>
	<cfquery name="qryWarehouses" datasource="TESTDATA">
		SELECT WHS, NAME, SHIPLIMIT, LICENSECAP
		FROM CPWHSMST
		WHERE ISCLOSED = 'N'
	</cfquery>
	<cfcatch>
		<cfthrow message="#cfcatch.message# #cfcatch.detail#">
	</cfcatch>
	</cftry>

	<cfset returnArray = queryToArray(qryWarehouses)>
	<cfreturn serializeToJSON(returnArray, true, true)>

</cffunction>

</cfcomponent>
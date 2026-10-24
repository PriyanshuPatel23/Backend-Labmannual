import {
    Controller,
    All,
    Get,
    Patch,
    Delete,
    HttpCode,
    Redirect,
    Header,
    Param,
    Query,
    Body,
} from '@nestjs/common';

@Controller('demo')
export class RoutingController {
    @All('all')
    handleAllMethods(): string {
        return 'Handled by @All – any HTTP verb works!';
    }

    @Get('created')
    @HttpCode(201)
    createdResponse(): string {
        return 'Created (HTTP 201) – response code overridden with @HttpCode';
    }

    @Get('go-google')
    @Redirect('https://www.google.com', 302)
    redirectToGoogle() {
    }

    @Get('custom-header')
    @Header('X-Custom-Header', 'NestRocks')
    headerExample(): string {
        return 'Check the “X-Custom-Header” response header';
    }

    @Get('wildcard/*')
    wildcard(@Param() params: any): string {
        return `Wildcard captured: ${params[0]}`;
    }

    @Get('deep/**')
    deepWildcard(@Param() params: any): string {
        return `Deep wildcard captured: ${params[0]}`;
    }

    @Get('id/:id')
    getId(@Param('id') id: string): string {
        return `Received id = ${id}`;
    }

    @Get('primes/:start/:end')
    getPrimes(
        @Param('start') startStr: string,
        @Param('end') endStr: string,
    ): number[] {
        const start = parseInt(startStr, 10);
        const end = parseInt(endStr, 10);
        const primes: number[] = [];
        for (let n = Math.max(2, start); n <= end; n++) {
            if (isPrime(n)) primes.push(n);
        }
        return primes;
    }

    @Get('page/:pageNo')
    getPageInfo(@Param('pageNo') pageNoStr: string): { start: number; end: number } {
        const pageNo = parseInt(pageNoStr, 10);
        const perPage = 5;
        const start = (pageNo - 1) * perPage + 1;
        const end = pageNo * perPage;
        return { start, end };
    }

    @Patch('partial')
    partialUpdate(@Body() payload: any): string {
        return `Partial update received: ${JSON.stringify(payload)}`;
    }
    
    @Delete('remove/:id')
    deleteItem(@Param('id') id: string): string {
        return `Deleted item with id ${id}`;
    }
}

function isPrime(n: number): boolean {
    if (n <= 1) return false;
    if (n <= 3) return true;
    if (n % 2 === 0 || n % 3 === 0) return false;

    for (let i = 5; i * i <= n; i += 6) {
        if (n % i === 0 || n % (i + 2) === 0) return false;
    }

    return true;
}
